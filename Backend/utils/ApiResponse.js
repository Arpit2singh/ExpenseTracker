

class ApiResponse{
    constructor(statusCode , message="Successfully compiled" , data) {
        this.data = data ; 
        this.success = statusCode ; 
        this.message = message ; 
        this.statusCode = statusCode ; 
    }
} 

export default ApiResponse ;