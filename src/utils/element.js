import Vue from 'vue';

import {Alert, Aside, Breadcrumb, BreadcrumbItem, Button,Card,Col,Container,DatePicker,Dialog,Empty,Form,FormItem,Header,Image,Input,Main,Menu,MenuItem,MenuItemGroup,Message,MessageBox,Option,Pagination,Radio, Row, Select, Submenu, Switch, Table, TableColumn, Upload} from 'element-ui';

Vue.use(Button);
Vue.use(Radio);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Card);
Vue.use(Input);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Header);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Image);
Vue.use(Pagination);
Vue.use(Card);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Upload);
Vue.use(Switch);
Vue.use(Empty);



// Vue.use(MessageBox);

// 挂载到Vue的原型上
// Vue.prototype.$msgBox=MessageBox
Vue.prototype.$confirm=MessageBox.confirm

Vue.prototype.$message=Message