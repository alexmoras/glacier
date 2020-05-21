<template>
    <div>
        <b-alert variant="success" :show="successAlert">A link has been sent to the email address supplied.</b-alert>
        <b-alert variant="danger" :show="errorAlert">An error occurred when sending the login link. Please try again.</b-alert>
        <b-form @submit="onSubmit" v-if="show">
            <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
            >
                <b-form-input
                        id="input-1"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="Enter email"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" disabled v-if="processing" squared>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
            </b-button>
            <b-button type="submit" variant="primary" v-if="!processing" squared>Submit</b-button>
        </b-form>
    </div>
</template>

<script>
    import axios from "axios";
    import qs from "querystring";
    import config from "../../config";
    export default {
        name: "LoginForm",
        data() {
            return {
                form: {
                    email: ''
                },
                show: true,
                processing: false,
                successAlert: false,
                errorAlert: false
            }
        },
        methods: {
            onSubmit(evt) {
                this.successAlert = false;
                this.errorAlert = false;
                this.processing = true;
                evt.preventDefault()
                axios({
                    method: "post",
                    url: config.apiUrl + "/auth/login",
                    data: qs.stringify({
                        email: this.form.email,
                        url: config.url + "/login/"
                    })
                })
                    .then(msg => {
                        this.processing = false;
                        if(msg.data.success === true){
                            this.successAlert = true;
                            this.$emit('success', true);
                        } else {
                            this.errorAlert = true;
                            this.$emit('success', false);
                            this.$emit('message', msg.data.message);
                        }
                    })
                    .catch(err => {
                        this.processing = false;
                        this.errorAlert = true;
                        this.$emit('success', false);
                        this.$emit('message', err);
                    })
            }
        }
    }
</script>

<style scoped>
    #spinner-submit{
        padding: 0.5rem;
    }
</style>