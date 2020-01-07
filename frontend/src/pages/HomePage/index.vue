<template>
    <div>
        <StaticNav />
        <b-container fluid>
            <b-card-title>
                Home Page
            </b-card-title>
        </b-container>
    </div>
</template>

<script>
    import StaticNav from "../../components/layout/StaticNav";

    export default {
        name: "HomePage",
        components: {StaticNav}
    }
</script>

<style scoped>

</style>