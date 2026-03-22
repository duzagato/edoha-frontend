import { MenuItem } from 'primeng/api';

export const getMenuItems = (): MenuItem[] => [
    {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/'
    },
    {
        label: 'Usuário',
        icon: 'pi pi-user',
        items: [
            {
                label: 'Gerenciar Usuários',
                icon: 'pi pi-users',
                routerLink: '/usuarios/gerenciar'
            }
        ]
    },
    {
        label: 'Rifa',
        icon: 'pi pi-ticket',
        items: [
            {
                label: 'Gerenciar Rifas',
                icon: 'pi pi-list',
                routerLink: '/rifas/gerenciar'
            }
        ]
    },
    {
        label: 'Onix',
        icon: 'pi pi-ticket',
        items: [
            {
                label: 'Resumo',
                icon: 'pi pi-table',
                routerLink: '/rifas/onix/resumo'
            },
            {
                label: 'Gerenciar',
                icon: 'pi pi-wrench',
                routerLink: '/rifas/onix/gerenciar'
            },
            {
                label: 'Retirada de Talão',
                icon: 'pi pi-ticket',
                routerLink: '/rifas/onix/talao/retirada'
            },
            {
                label: 'Devolução de Talão',
                icon: 'pi pi-ticket',
                routerLink: '/rifas/onix/talao/devolucao'
            },
            {
                label: 'Venda de Número',
                icon: 'pi pi-tag',
                routerLink: '/rifas/onix/talao/devolucao'
            }
        ]
    }
];