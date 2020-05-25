<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "JWTManager",
        methods: {
            setJWT(jwt){
                localStorage.setItem('jsonwebtoken', jwt);
            },

            deleteJWT(){
                localStorage.removeItem('jsonwebtoken');
            },

            getJWT(){
                return localStorage.getItem('jsonwebtoken');
            },

            getJWTHeader(){
                return {'Authorization': "Bearer " + localStorage.getItem('jsonwebtoken')};
            },

            getJWTPayload(){
                let token = localStorage.getItem('jsonwebtoken');
                let base64Url = token.split('.')[1];
                let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                return JSON.parse(jsonPayload);
            }
        }
    }
</script>

<style scoped>

</style>