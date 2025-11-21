```mermaid
sequenceDiagram
    autonumber
    participant A as Cliente/Browser
    participant B as Gateway/BFF
    participant C as Serviço de Usuário
    participant D as Serviço de Notificação
    participant E as Serviço de Rate Limit
    participant F as Tabela Tokens DB

    A->>B: Requisição de Esqueceu Senha (email)

    B->>E: Verificar limite (GET /limite/email)
    alt Limite Excedido
        E-->>B: Retorna 429
        B-->>A: Retorna "Tente novamente mais tarde"
        Note right of A: Alerta visual para o usuário
    else Limite OK
        E-->>B: Retorna OK e incrementa contador
        B->>C: Obter ID do Usuário por Email
        
        alt Usuário Encontrado
            C-->>B: Retorna UserID
            B->>C: Gerar Token de Uso Único
            
            C->>F: Salvar Token (TTL: 1h)
            F-->>C: Confirmação
            
            C-->>B: Retorna Token/Link
            
            Note left of B: Monta o Link de Recuperação
            B->>D: Enviar Email com Link
            
            D-->>B: Confirma Envio
            B-->>A: Retorna Sucesso (Verifique seu email)
        else Usuário Não Encontrado
            C-->>B: Retorna Usuário Inexistente
            B-->>A: Retorna Sucesso Falso (Segurança)
            Note right of A: Não revela se o email existe
        end
    end