<!-- Used on the static version of the site, not in the app. -->
<template>
    <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-brand>GLACIER</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/" exact exact-active-class="active">Home</b-nav-item>
                <b-nav-item to="/features" exact exact-active-class="active">Features</b-nav-item>
                <b-nav-item to="/docs" exact exact-active-class="active">Documentation</b-nav-item>
                <b-nav-item to="/app" exact exact-active-class="active">App</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item>
                    <b-button class="btn-block" variant="outline-light" squared to="/login">Login</b-button>
                </b-nav-item>
                <b-nav-item>
                    <b-button class="btn-block" variant="light" squared to="/create">Create</b-button>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: "StaticNav"
    }
</script>

<style scoped>
    .navbar{
        box-shadow: 0 .25rem .25rem rgba(0,0,0,.25),inset 0 -1px 5px rgba(0,0,0,.25);
    }
    .navbar-toggler{
        border-radius: 0;
    }
    .nav-item{
        font-family: 'Montserrat', sans-serif;
    }
    .active{
        font-weight: 500;
    }
</style>