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
            }
        }
    }
</script>

<style scoped>

</style>