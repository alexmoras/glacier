<template>
    <div>
        <b-form @submit="onSubmit">
            <b-form-input
                    :placeholder="user.email"
                    disabled
            />
            <b-input-group
                    size="md"
                    prepend="First Name"
            >
                <b-form-input
                        id="forename"
                        v-model="forename"
                        :placeholder="user.forename"
                        required
                />
            </b-input-group>

            <b-input-group
                    size="md"
                    prepend="Last Name"
            >
                <b-form-input
                        id="surname"
                        v-model="surname"
                        :placeholder="user.surname"
                        required
                />
            </b-input-group>

            <b-input-group
                    size="md"
                    prepend="Date of Birth"
            >
                <b-form-datepicker
                        id="dob"
                        v-model="dob"
                        show-decade-nav
                        :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
                        required
                />
            </b-input-group>

            <b-input-group
                    size="md"
                    prepend="Medical Notes"
            >
                <b-form-textarea
                        id="medical"
                        v-model="medical"
                        :placeholder="user.medical"
                        required
                />
            </b-input-group>
        </b-form>
    </div>
</template>

<script>
    import axios from "axios";
    import JWTManager from "../../../../components/JWTManager";
    export default {
        name: "UserWizard",
        components: {},
        data() {
            return {
                user: {},
                forename: '',
                surname: '',
                dob: '',
                medical: '',
                idNumber: {},
                phone: {},
                address: {}
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
                            this.user = msg.data.message;
                        }
                        return msg;
                    })
                    .catch(err => {
                        return err;
                    })
            },
            onSubmit(){
                return true;
            }
        },
        computed: {
        },
        created() {
            this.getSelf();
        }
    }
</script>

<style scoped>

</style>