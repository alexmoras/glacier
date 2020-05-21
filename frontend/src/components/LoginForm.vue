<template>
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

        <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
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
                show: true
            }
        },
        methods: {
            onSubmit(evt) {
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
                        if(msg.data.success === true){
                            alert("Success.")
                        } else {
                            alert("Error.")
                        }
                    })
                    .catch(err => {
                        alert(err);
                    })
            }
        }
    }
</script>

<style scoped>

</style>