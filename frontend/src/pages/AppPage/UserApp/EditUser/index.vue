<template>
    <div>
        <p v-text="user"></p>
        <b-form>
            <div id="address-container">
                <b-button class="addButton" @click="addAddress">Add Address</b-button>
                <div id="address" v-for="(add, counter) in address" v-bind:key="counter">
                    <b-form-input
                            id="line1"
                            placeholder="Line 1"
                            v-model="add.line1"
                            required
                    ></b-form-input>

                    <b-form-input
                            id="line2"
                            placeholder="Line 2"
                            v-model="add.line2"
                    ></b-form-input>

                    <b-form-input
                            id="town"
                            placeholder="Town"
                            v-model="add.town"
                    ></b-form-input>

                    <b-form-input
                            id="county"
                            placeholder="County"
                            v-model="add.county"
                    ></b-form-input>

                    <b-form-input
                            id="country"
                            placeholder="Country"
                            v-model="add.country"
                            required
                    ></b-form-input>

                    <b-form-input
                            id="postcode"
                            placeholder="Post Code"
                            v-model="add.postcode"
                            required
                    ></b-form-input>
                    <b-button class="deleteButton" @click="deleteAddress(counter)">Delete Address</b-button>
                </div>
            </div>
            <div id="phone-container">
                <b-button class="addButton" @click="addPhone">Add Phone</b-button>
                <div id="phone" v-for="(add, counter) in phone" v-bind:key="counter">
                    <b-form-input
                            id="phone"
                            placeholder="Phone Number"
                            v-model="phone[counter]"
                            required
                    ></b-form-input>
                    <b-button class="deleteButton" @click="deletePhone(counter)">Delete Phone</b-button>
                </div>
            </div>
            <div id="idNumber-container">
                <b-button class="addButton" @click="addID">Add ID</b-button>
                <div id="idNumber" v-for="(add, counter) in idNumber" v-bind:key="counter">
                    <b-form-input
                            id="name"
                            placeholder="ID Type (Driving Licence, Student Card, Passport, etc)"
                            v-model="add.name"
                            required
                    ></b-form-input>

                    <b-form-input
                            id="value"
                            placeholder="ID Number"
                            v-model="add.value"
                            required
                    ></b-form-input>
                    <b-button class="deleteButton" @click="deleteID(counter)">Delete ID</b-button>
                </div>
            </div>
            <b-button @click="onSubmit">Submit</b-button>
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
                idNumber: [],
                phone: [],
                address: [],
                contacts: []
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
                            this.forename = msg.data.message.ice.forename;
                            this.surname = msg.data.message.ice.surname;
                            this.dob = msg.data.message.ice.dob;
                            this.medical = msg.data.message.ice.medical;
                            if(Array.isArray(msg.data.message.ice.address)){
                                this.address = msg.data.message.ice.address;
                            }

                            if(Array.isArray(msg.data.message.ice.phone)){
                                this.phone = msg.data.message.ice.phone;
                            }

                            if(Array.isArray(msg.data.message.ice.idNumber)){
                                this.idNumber = msg.data.message.ice.idNumber;
                            }

                            if(Array.isArray(msg.data.message.ice.contacts)){
                                this.contacts = msg.data.message.ice.contacts;
                            }
                        }
                        return msg;
                    })
                    .catch(err => {
                        return err;
                    })
            },
            addAddress(){
                this.address.push({
                    line1: '',
                    line2: '',
                    town: '',
                    county: '',
                    country: '',
                    postcode: ''
                });
            },
            deleteAddress(counter){
                this.address.splice(counter, 1);
            },
            addPhone(){
                this.phone.push('');
            },
            deletePhone(counter){
                this.phone.splice(counter, 1);
            },
            addID(){
                this.idNumber.push({
                    name: '',
                    value: ''
                });
            },
            deleteID(counter){
                this.idNumber.splice(counter, 1);
            },
            onSubmit(){
                let json = {
                    forename: this.forename,
                    surname: this.surname,
                    dob: this.dob,
                    medical: this.medical,
                    address: this.address,
                    phone: this.phone,
                    idNumber: this.idNumber,
                    contacts: this.contacts
                };
                axios({
                    method: 'put',
                    url: '/users/me/ice',
                    data: JSON.stringify(json),
                    headers: {
                        'Authorization': 'Bearer ' + JWTManager.methods.getJWT(),
                        'Content-Type': 'application/json'
                    }
                })
                .then(msg => {
                    if(msg.data.success === true){
                        alert("Success");
                    } else {
                        alert(msg.data.message);
                    }
                })
                .catch(err => {
                    alert(err + '\n' + JSON.stringify(json));
                });
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