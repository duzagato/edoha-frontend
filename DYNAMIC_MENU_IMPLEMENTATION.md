# Dynamic Lottery Menu Implementation

## Overview
This implementation adds dynamic menu generation for lottery management in the sidebar. Each lottery (raffle) retrieved from the backend will have its own expandable menu with 7 operational submenu items.

## Menu Structure

### Static Menu Items (Always Visible)
1. **Home** - Root navigation
2. **Usuário** (User Management)
   - Gerenciar Usuários (Manage Users)
   - Adicionar Usuário (Add User)
3. **Rifa** (Lottery/Raffle Management)
   - Gerenciar Rifas (Manage Lotteries)
   - Adicionar Rifa (Add Lottery)

### Dynamic Menu Items (Generated from API)
For each lottery retrieved from `GET /lottery`, a new expandable menu is created with the lottery's name as the title. Each lottery menu contains 7 submenu items:

- **Resumo** (Summary) - `/rifas/{lotteryId}/resumo`
- **Gerenciar Talões** (Manage Ticketbooks) - `/rifas/{lotteryId}/gerenciar-taloes`
- **Gerenciar Números** (Manage Numbers/Tickets) - `/rifas/{lotteryId}/gerenciar-numeros`
- **Retirada de Talão** (Ticketbook Withdrawal) - `/rifas/{lotteryId}/retirada-talao`
- **Devolução de Talão** (Ticketbook Return) - `/rifas/{lotteryId}/devolucao-talao`
- **Venda de Número** (Number/Ticket Sale) - `/rifas/{lotteryId}/venda-numero`
- **Venda de Talão** (Ticketbook Sale) - `/rifas/{lotteryId}/venda-talao`

## Example Menu Structure

```
├── Home
├── Usuário ▼
│   ├── Gerenciar Usuários
│   └── Adicionar Usuário
├── Rifa ▼
│   ├── Gerenciar Rifas
│   └── Adicionar Rifa
├── Rifa de Natal 2024 ▼  (Dynamic - from API)
│   ├── Resumo
│   ├── Gerenciar Talões
│   ├── Gerenciar Números
│   ├── Retirada de Talão
│   ├── Devolução de Talão
│   ├── Venda de Número
│   └── Venda de Talão
└── Rifa Beneficente ▼  (Dynamic - from API)
    ├── Resumo
    ├── Gerenciar Talões
    ├── Gerenciar Números
    ├── Retirada de Talão
    ├── Devolução de Talão
    ├── Venda de Número
    └── Venda de Talão
```

## Technical Implementation

### Components Modified
- **sidebar.component.ts**: Enhanced to fetch lotteries via `LotteryService.getAll()` and dynamically generate menu items

### Components Created
Seven new placeholder components for lottery operations:
1. `resumo.component.ts`
2. `gerenciar-taloes.component.ts`
3. `gerenciar-numeros.component.ts`
4. `retirada-talao.component.ts`
5. `devolucao-talao.component.ts`
6. `venda-numero.component.ts`
7. `venda-talao.component.ts`

### Routes Updated
- **lottery.routes.ts**: Added 7 new dynamic routes with `:id` parameter to handle lottery-specific operations

## API Integration
- **Endpoint**: `GET /lottery`
- **Service**: `LotteryService.getAll()`
- **Data Model**: `LotteryDTO[]`

The menu automatically populates when:
1. The user logs in and navigates to the application
2. The sidebar component initializes (`ngOnInit`)
3. The API successfully returns the list of lotteries

## Icons Used (Material Icons)
- **Lottery**: `confirmation_number`
- **Resumo**: `summarize`
- **Gerenciar Talões**: `receipt_long`
- **Gerenciar Números**: `tag`
- **Retirada de Talão**: `assignment_return`
- **Devolução de Talão**: `assignment_returned`
- **Venda de Número**: `sell`
- **Venda de Talão**: `point_of_sale`

## Testing
To test this implementation:
1. Ensure the backend API is running and accessible
2. Create at least one lottery using the "Adicionar Rifa" form
3. Refresh the page or re-login
4. The new lottery should appear in the sidebar menu with all 7 submenu items
5. Click on any submenu item to navigate to the respective page

## Future Enhancements
The placeholder components created are minimal and display only the lottery ID. They should be enhanced to:
- Display lottery-specific information
- Implement forms for data entry (withdrawals, returns, sales)
- Show tables with ticketbook and ticket data
- Integrate with the respective backend endpoints for each operation
