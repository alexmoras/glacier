<template>
    <b-container fluid="lg" id="container-user">
        <b-row>
            <b-col>
                <b-container fluid="lg">
                    <b-alert variant="success" :show="editSuccess">Changes have been saved successfully.</b-alert>
                    <b-alert variant="danger" :show="editError">An error occurred whilst saving changes. Please try again.</b-alert>
                </b-container>
                <ShowUser v-if="showUserToggle === true" v-bind:userParam="'me'" v-bind:user="user" v-bind:edit="true" v-on:editContacts="editContact" v-on:editUser="editUser" />
                <EditUser v-if="editUserToggle === true" v-on:success="editComplete($event)" v-bind:user="user" />
                <EditContact v-if="editContactToggle === true" v-on:success="editComplete($event)" v-bind:user="user" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import ShowUser from "../../../components/ShowUser";
    import EditUser from "./EditUser";
    import EditContact from "./EditContact";
    import axios from "axios";
    import JWTManager from "../../../components/JWTManager";
    import config from "../../../../config";
    export default {
        name: "UserApp",
        components: {EditContact, EditUser, ShowUser},
        data() {
            return {
                loaded: false,
                user: {},
                showUserToggle: false,
                editUserToggle: false,
                editContactToggle: false,
                editSuccess: false,
                editError: false
            }
        },
        methods: {
            async getUser(user){
                let userParam;
                if(user){
                    userParam = user;
                } else {
                    userParam = 'me';
                }
                return axios({
                    method: 'get',
                    url: config.apiUrl + '/users/' + userParam,
                    headers: JWTManager.methods.getJWTHeader()
                })
                .then(msg => {
                    if(msg.data.success === true){
                        this.user = msg.data.message;
                        this.loaded = true;
                        return msg.data.message;
                    }
                    else {
                        throw new Error(msg.data);
                    }
                })
            },
            showUser(){
                this.showUserToggle = true;
                this.editUserToggle = false;
                this.editContactToggle = false;
            },
            editUser(){
                this.showUserToggle = false;
                this.editUserToggle = true;
                this.editContactToggle = false;
            },
            editContact(){
                this.showUserToggle = false;
                this.editUserToggle = false;
                this.editContactToggle = true;
            },
            editComplete(success){
                if(success === true){
                    this.loaded = false;
                    this.getUser()
                    .then(() => {
                        this.$forceUpdate();
                        this.showUser();
                        this.editSuccess = true;
                    })
                    .catch(() => {
                        this.editError = true;
                    })
                } else {
                    this.editError = true;
                }
            }
        },
        created() {
            this.loaded = false;
            this.getUser()
            .then(() => {
                this.showUser();
            })
            .catch(() => {
                this.$router.push("/login");
            })
            if(this.user.forename === null || this.user.forename === ''){
                // Get-started Wizard
            }
        }
    }
</script>

<style scoped>
    #container-user{
        padding-top: 0.5rem;
    }
</style>