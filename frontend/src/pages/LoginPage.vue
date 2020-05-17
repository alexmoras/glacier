<template>
    <div>
        <StaticNav />
        <b-container fluid>
            <LoginForm />
        </b-container>
    </div>
</template>

<script>
    import StaticNav from "../components/layout/StaticNav";
    import LoginForm from "../components/LoginForm";
    export default {
        name: "LoginPage",
        components: {LoginForm, StaticNav}
    }
</script>

<style scoped>

</style>