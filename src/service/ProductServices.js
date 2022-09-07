import axios from "../axios";

class ProductServices {
    postProduct = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('products', data).then((res) => {
                return resolve(res)
            })
                .catch((err) => {
                    return resolve(err)
                })
        });
        return promise;
    }

    fetchProduct = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('products')
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })

        return await promise;
    }
    putProduct = async (data) => {
        const promise = new Promise(((resolve, reject) => {
                axios.put('products', data).then((res) => {
                    return resolve(res)
                })
                    .catch((err) => {
                        return resolve(err)
                    })
            })
        )
        return await promise;
    }

    deleteProduct = async (params) => {
        const promise = new Promise((resolve, reject) => {
            axios.delete('products',{params:params}).
            then((res)=>{
                return resolve(res)
            })
                .catch((err)=>{
                    return resolve (err)
                })
        })
        return await promise;
    };
}

export default new ProductServices();