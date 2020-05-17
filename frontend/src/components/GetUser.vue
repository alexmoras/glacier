<template>
    <div>
        <h3>USER:</h3><br>
        <p v-text="user"></p>
        <br><br>
        <h3>ICE:</h3><br>
        <p v-text="ice"></p>
        <br><br>
        <h3>SERVICE:</h3><br>
        <p v-text="service"></p>
    </div>
</template>

<script>
    import axios from 'axios';
    import JWTManager from "./JWTManager";
    export default {
        name: "GetUser",
        data() {
            return {
                user: '',
                ice: '',
                service: '',
                all: ''
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
                        this.all = msg.data.message;
                        this.user = {};
                        this.user.email = msg.data.message.email;
                        this.user.permission = msg.data.message.permission;
                        this.ice = msg.data.message.ice;
                        this.service = msg.data.message.service;
                    }
                    return msg;
                })
                .catch(err => {
                    return err;
                })
            },

            getFromID(userID){
                axios({
                    method: 'get',
                    url: '/users/' + userID,
                    headers: JWTManager.methods.getJWTHeader()
                })
                    .then(msg => {
                        if(msg.data.success === true){
                            this.user = {};
                            this.user.email = msg.data.message.email;
                            this.user.permission = msg.data.message.permission;
                            this.ice = msg.data.message.ice;
                            this.service = msg.data.message.service;
                        }
                    })
                    .catch(err => {
                        return err;
                    })
            }
        },
        computed: {
            getCached(type){
                if(type === "user"){
                    return this.user;
                } else if(type === "ice"){
                    return this.ice;
                } else if(type === "service"){
                    return this.service;
                } else {
                    return this.all;
                }
            }
        }
    }
</script>

<style scoped>

</style>