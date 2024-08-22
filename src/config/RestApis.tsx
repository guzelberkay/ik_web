const server_local = 'http://localhost:9090';

const server = server_local;
const apis = {
    authService: server+'/user',
    userService: server+'/user',
    adminService: server+'/admin',
    employeeService: server+'/employee',
    companyService: server+'/company',
    leaveService: server+'/leave',
    expenseService: server+'/expense'
}

export default apis;