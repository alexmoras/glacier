<template>
    <div>
        <footer class="footer fixed-bottom">
            <b-container fluid="lg">
                <span class="text-muted float-left">
                    Copyright Alex Moras 2020.
                </span>
                <span class="float-right">
                    <a href="https://github.com/alexmoras/glacier" target="_blank">Glacier v.{{ version }}.</a>
                </span>
            </b-container>
        </footer>
    </div>
</template>

<script>
    import config from "../../../config";
    export default {
        name: "AppFooter",
        data() {
            return {
                version: ''
            }
        },
        created() {
            this.version = config.version;
        }
    }
</script>

<style scoped>
    .footer {
        width: 100%;
        height: 60px;
        line-height: 60px;
        background-color: #f5f5f5;
    }
</style>