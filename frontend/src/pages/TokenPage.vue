<template>
    <div>
        <StaticNav />
        <b-container fluid>

        </b-container>
    </div>
</template>

<script>
    import StaticNav from "../components/layout/StaticNav";
    import JWTManager from "../components/JWTManager";
    import axios from "axios";
    import qs from "querystring";
    export default {
        name: "TokenPage",
        components: {StaticNav},
        created() {
            let token = this.$route.params.token;
            axios({
                method: "post",
                url: "/auth/token",
                data: qs.stringify({
                    token: token
                })
            })
            .then(msg => {
                if(msg.data.success === true){
                    JWTManager.methods.setJWT(msg.data.message.token);
                    this.$router.push('/app');
                } else {
                    alert(":sad_face:");
                    this.$router.push('/');
                }
            })
            .catch(err => {
                alert(err);
            })
        }
    }
</script>

<style scoped>

</style>