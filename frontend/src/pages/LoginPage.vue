<template>
    <div>
        <StaticNav />
        <b-container fluid>
            <b-card-title>
                Login Page
            </b-card-title>
        </b-container>
    </div>
</template>

<script>
    import StaticNav from "../components/layout/StaticNav";
    export default {
        name: "LoginPage",
        components: {StaticNav}
    }
</script>

<style scoped>

</style>