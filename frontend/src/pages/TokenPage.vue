<template>
    <div>
        <AppNav />
        <b-container class="text-center token-container" fluid="lg">
            <span>
                <b-spinner variant="success" label="Spinning"></b-spinner>
            </span>
            <br>
            <p>Logging in...</p>
        </b-container>
        <AppFooter />
    </div>
</template>

<script>
    import AppNav from "../components/layout/AppNav";
    import JWTManager from "../components/JWTManager";
    import axios from "axios";
    import qs from "querystring";
    import config from "../../config";
    import AppFooter from "../components/layout/AppFooter";
    export default {
        name: "TokenPage",
        components: {AppFooter, AppNav},
        created() {
            let token = this.$route.params.token;
            axios({
                method: "post",
                url: config.apiUrl + "/auth/token",
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
    .token-container{
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
</style>