<template>
    <div>
        <AppNav />
        <b-container fluid>
            <LoginForm />
        </b-container>
    </div>
</template>

<script>
    import AppNav from "../components/layout/AppNav";
    import LoginForm from "../components/LoginForm";
    export default {
        name: "LoginPage",
        components: {LoginForm, AppNav}
    }
</script>

<style scoped>

</style>