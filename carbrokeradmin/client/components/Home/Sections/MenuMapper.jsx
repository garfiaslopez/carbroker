/**
 * Basic routes App
 */
import QuotationsList from './Quotations/QuotationsList';
import BudgetsList from './Budgets/BudgetsList';
import ServicesList from './Services/ServicesList';
import EmployeesList from './Employees/EmployeesList';
import FaresList from './Fares/FaresList';
import ClientsList from './Clients/ClientsList';
import TowsList from './Tows/TowsList';

export default class Mapper {
    constructor() {
        this.session = undefined;
        this.mapping = [];
    }
    
    setSession(session) {
        this.session = session;
        if (this.session.type === "manager") {
            this.mapping = [
                {
                    title: 'Cotizaciones',
                    component: QuotationsList,
                    isSelected: true
                },
                {
                    title: 'Presupuestos',
                    component: BudgetsList,
                    isSelected: false
                },
                {
                    title: 'Servicios',
                    component: ServicesList,
                    isSelected: false
                },
                {
                    title: 'Empleados',
                    component: EmployeesList,
                    isSelected: false
                },
                {
                    title: 'Tarifas',
                    component: FaresList,
                    isSelected: false
                },
                {
                    title: 'Clientes',
                    component: ClientsList,
                    isSelected: false
                },
                {
                    title: 'Gruas',
                    component: TowsList,
                    isSelected: false
                }
            ];
        }else{
            this.mapping = [
                {
                    title: 'Servicios',
                    component: ServicesList,
                    isSelected: true
                }
            ];
        }
    }
    getMenus() {
        if (this.session) {
            return this.mapping;
        }
        return [];
    }
    getElement(index) {
        if (this.mapping.length > 0) {
            return this.mapping[index];
        }
    }
}
