# 7 - Sincronização de ApiRoutes com OpenAPI

## O que foi alterado

Arquivo: `src/app/shared/constants/api-routes.ts`

O arquivo foi completamente revisado e sincronizado com a especificação `documentation/integrations/openapi.yaml`.

## Correções de rotas incorretas

### Casing (maiúsculas → minúsculas)
Todos os controllers tinham o path em PascalCase (`/Action`, `/Institution`, `/User`, etc.). Corrigido para lowercase conforme o OpenAPI:
- `/Action` → `/action`
- `/Institution` → `/institution`
- `/api/Page` → `/api/page`
- `/Permission` → `/permission`
- `/StatusTicketbook` → `/statusticketbook`
- `/Ticket` → path correto com contexto (ver abaixo)
- `/User` → `/user`
- `/UserInstitution` → `/userinstitution`
- `/UserPermission` → `/userpermission`
- `/UserType` → `/usertype`

### Parâmetros faltando nas rotas
- `INSTITUTION_GET_BY_SLUG`: era `/institution`, corrigido para `/institution/{slug}`
- `INSTITUTION_GET_BY_USER`: era `/institution/institution_by_user`, corrigido para `/institution/institution_by_user/{idUser}`
- GET_BY_ID e DELETE de todos os controllers: faltava o sufixo `/{id}`

### Reestruturação de Lottery
Rotas de rifa passaram a ser aninhadas sob instituição, conforme OpenAPI:
- `LOTTERY_GET_ALL`: `/Lottery` → `/institution/{idInstitution}/lottery`
- `LOTTERY_GET_BY_ID`: `/Lottery` → `/institution/{idInstitution}/lottery/{id}`
- `LOTTERY_POST`: `/Lottery` → `/institution/{idInstitution}/lottery`
- `LOTTERY_PUT`: `/Lottery` → `/institution/{idInstitution}/lottery`
- `LOTTERY_DELETE`: `/Lottery` → `/institution/{idInstitution}/lottery/{id}`
- Removido `LOTTERY_GET_BY_INSTITUTION` (redundante com GET_ALL)

### Reestruturação de Ticketbook
Rotas de talão passaram a ser aninhadas sob lottery:
- `TICKETBOOK_GET_ALL`: `lottery/{idLottery}/ticketbook` (faltava `/` inicial) → `/lottery/{idLottery}/ticketbook`
- `TICKETBOOK_GET_BY_ID`: `/ticketbook` → `/lottery/{idLottery}/ticketbook/{id}`
- `TICKETBOOK_GET_RETURNEDS`: `/ticketbook/returneds` → `/lottery/{idLottery}/ticketbook/returneds`
- `TICKETBOOK_GET_WITHDRAWNS`: `/ticketbook/withdrawns` → `/lottery/{idLottery}/ticketbook/withdrawns`
- `TICKETBOOK_PUT`: `/ticketbook` → `/lottery/{idLottery}/ticketbook`
- `TICKETBOOK_DELETE`: `/ticketbook` → `/lottery/{idLottery}/ticketbook/{id}`
- Removido `TICKETBOOK_POST_BY_LOTTERY` (apontava para `/institution`, completamente errado)

### Reestruturação de Ticket
Rotas de bilhete passaram a incluir contexto do talão:
- `TICKET_GET_ALL`: `/Ticket` → `/ticketbook/{idTicketbook}/ticket`
- `TICKET_GET_BY_ID`: `/Ticket` → `/ticketbook/{idTicketbook}/ticket/{id}`
- `TICKET_PUT`: `/Ticket` → `/ticketbook/{idTicketbook}/ticket`
- `TICKET_DELETE`: `/Ticket` → `/ticketbook/{idTicketbook}/ticket/{id}`

### Institution
- Removido `INSTITUTION_GET_BY_ID` (não existe no OpenAPI — apenas GET por slug)

## Rotas adicionadas (estavam faltando)

| Constante | Rota |
|---|---|
| `TABLE_CONFIGURATION_GET` | `/tableconfiguration/{schema}/{tableName}` |
| `USER_GET_INFORMATION` | `/user/user_information` |
| `TICKETBOOK_PATCH_STATUS` | `/lottery/{idLottery}/ticketbook/{idTicketbook}/status/{idStatusTicketbook}` |
| `TICKETBOOK_PATCH_STATUS_RETURNED` | `/lottery/{idLottery}/ticketbook/{idTicketbook}/status/returned` |
| `TICKETBOOK_PATCH_STATUS_WITHDRAW` | `/lottery/{idLottery}/ticketbook/{idTicketbook}/status/withdraw` |
