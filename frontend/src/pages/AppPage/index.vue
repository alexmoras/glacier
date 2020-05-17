<template>
    <div>
        <StaticNav />
        <b-container fluid>
            <b-card-title>
                App Page
            </b-card-title>
            <UserWizard />
        </b-container>
    </div>
</template>

<script>
    import StaticNav from "../../components/layout/StaticNav";
    import axios from "axios";
    import JWTManager from "../../components/JWTManager";
    import UserWizard from "./UserApp/edit/index";
    //import GetUser from "../../components/GetUser";
    //import qs from "querystring";

    export default {
        name: "AppPage",
        components: {UserWizard, StaticNav},
        data() {
            return {
                data: ""
            }
        },
        methods: {
            getSelf(){
                axios({
                    method: 'get',
                    url: '/users/me',
                    headers: JWTManager.methods.getJWTHeader()
                })
                    .then(msg => {
                        if(msg.data.success === true){
                            this.data = msg.data.message;
                        }
                        return msg;
                    })
                    .catch(err => {
                        return err;
                    })
            }
        },
        created() {
            this.getSelf();
        }
    }
</script>

<style scoped>

</style>