<template>
    <div>
        <AppNav />
        <b-container fluid="">
            <ServiceApp v-if="service" />
            <UserApp v-else />
        </b-container>
    </div>
</template>

<script>
    import AppNav from "../../components/layout/AppNav";
    import UserApp from "./UserApp/index";
    import ServiceApp from "./ServiceApp/index";
    import JWTManager from "../../components/JWTManager";

    export default {
        name: "AppPage",
        components: {ServiceApp, UserApp, AppNav},
        data() {
            return {
                loggedIn: false,
                service: false
            }
        },
        methods: {
        },
        created() {
            if(JWTManager.methods.getJWTPayload().permission.service === true){
                this.service = true;
            }
        }
    }
</script>

<style scoped>

</style>