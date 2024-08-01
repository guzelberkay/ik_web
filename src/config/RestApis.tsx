const server_local = 'http://localhost:9090';

const server = server_local;
const apis = {
    authService: server+'/user',
    userService: server+'/user',
}

export default apis;