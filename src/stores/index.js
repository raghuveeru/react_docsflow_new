import BudgetStore from './BudgetStore';
import AdminStore from './AdminStore';
import AuthStore from './AuthStore';
import BudgetDetailStore from './BudgetDetailStore';
import NotificationStore from './NotificationStore';
import HelpStore from './HelpStore';
import MyProfileStore from './MyProfileStore'

module.exports = {
	BudgetStore: new BudgetStore(),
	AdminStore: new AdminStore(),
	BudgetDetailStore: new BudgetDetailStore(),
	NotificationStore: new NotificationStore(),
	AuthStore: new AuthStore(),
    HelpStore: new HelpStore(),
		MyProfileStore: new MyProfileStore(),
}
