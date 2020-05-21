<template>
    <div>
        <AppNav />
        <b-container fluid="lg" id="container-login-form" v-if="loaded === true">
            <b-card >
                <LoginForm />
            </b-card>
        </b-container>
    </div>
</template>

<script>
    import AppNav from "../components/layout/AppNav";
    import LoginForm from "../components/LoginForm";
    import axios from "axios";
    import config from "../../config";
    import JWTManager from "../components/JWTManager";
    export default {
        name: "LoginPage",
        components: {LoginForm, AppNav},
        data() {
            return {
                loaded: false
            }
        },
        methods: {
            async getUser() {
                return axios({
                    method: 'get',
                    url: config.apiUrl + '/users/me',
                    headers: JWTManager.methods.getJWTHeader()
                })
                    .then(msg => {
                        if (msg.data.success === true) {
                            return msg.data.message;
                        } else {
                            throw new Error(msg.data);
                        }
                    })
            }
        },
        created() {
            if(JWTManager.methods.getJWT() != null){
                this.getUser()
                .then(() => {
                    this.$router.push("/app");
                })
                .catch(() => {
                    JWTManager.methods.deleteJWT();
                    this.loaded = true;
                })
            } else {
                this.loaded = true;
            }
        }
    }
</script>

<style scoped>
    #container-login-form{
        padding-top: 0.5rem;
    }
</style>