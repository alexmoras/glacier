<template>
    <b-navbar class="shadow-sm" toggleable="md" type="light" variant="light">
        <b-container>
        <b-navbar-brand>GLACIER</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/" exact exact-active-class="active">Home</b-nav-item>
                <b-nav-item href="https://github.com/alexmoras/glacier/tree/staging" exact exact-active-class="active">GitHub</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto" v-if="loggedIn === true">
                <b-nav-text class="text-welcome" v-if="forename != null && forename !== ''">Hi there, {{forename}}!</b-nav-text>
                <b-nav-text class="text-welcome" v-else>Hello! How are you?</b-nav-text>
                <b-nav-item>
                    <b-button class="btn-block" variant="success" squared @click="loadApp">Dashboard</b-button>
                </b-nav-item>
                <b-nav-item>
                    <b-button class="btn-block" variant="dark" exact exact-active-class="active-btn-login" squared @click="logout">Logout</b-button>
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto" v-else>
                <b-nav-item>
                    <b-button class="btn-block" variant="outline-dark" exact exact-active-class="active-btn-login" squared to="/login">Login</b-button>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
    import JWTManager from "../JWTManager";

    export default {
        name: "AppNav",
        data (){
            return {
                loggedIn: false,
                forename: null
            }
        },
        methods: {
            loginStatus(){
                this.loggedIn = JWTManager.methods.getJWT() != null;
            },
            loadApp(){
                if(this.$route.path === "/app"){
                    this.$router.go(0);
                } else {
                    this.$router.push("/app");
                }
            },
            logout(){
                JWTManager.methods.deleteJWT();
                this.loggedIn = false;
                this.$router.go(0);
            }
        },
        created() {
            this.loginStatus();
            if(JWTManager.methods.getJWTPayload() != null){
                this.forename = JWTManager.methods.getJWTPayload().forename;
            }
        }
    }
</script>

<style scoped>
    .navbar-toggler{
        border-radius: 0;
    }
    .navbar-brand{
        font-family: 'Montserrat', sans-serif;

    }
    .nav-item{
        font-family: 'Montserrat', sans-serif;
    }
    .active-btn-login{
        background-color: #343a40;
        color: white;
    }
    .active{
        font-weight: 600;
    }
    .text-welcome{
        padding-top: 1rem;
        padding-right: 1rem;
        font-family: 'Montserrat', sans-serif;
        font-style: italic;
        font-weight: 500;
    }
</style>