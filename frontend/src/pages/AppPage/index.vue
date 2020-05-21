<template>
    <div>
        <AppNav />
        <b-container fluid="">
            <UserApp />
        </b-container>
    </div>
</template>

<script>
    import AppNav from "../../components/layout/AppNav";
    import UserApp from "./UserApp/index";

    export default {
        name: "AppPage",
        components: {UserApp, AppNav},
        data() {
            return {
                loggedIn: false,
            }
        },
        methods: {
        },
        created() {
        }
    }
</script>

<style scoped>

</style>