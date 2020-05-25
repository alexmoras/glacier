<template>
    <div>
        <AppNav />
        <b-container class="main-content" fluid="lg">
            <div>
                <b-jumbotron>
                    <template v-slot:header>Glacier</template>
                    <template v-slot:lead>
                        Share your "in case of emergency" details with Ambulance, Police and your University.
                    </template>

                    <hr class="my-4">
                    <div class="text-center">
                        <b-button class="text-center" to="/login" variant="success" size="lg">Get Started</b-button>
                    </div>
                </b-jumbotron>
            </div>

            <div>
                <b-card-group deck>
                    <b-card :img-src="studentImg" img-top>
                        <b-card-title>Students</b-card-title>
                        <b-card-body>
                            <b-card-text class="home-text">
                                Sharing your emergency contact details keeps you and your friends safe on nights out. If
                                you're lost, vulnerable or injured - get help quicker with Glacier.
                            </b-card-text>
                        </b-card-body>
                    </b-card>

                    <b-card :img-src="emergencyImg" img-top>
                        <b-card-title>Emergency Services</b-card-title>
                        <b-card-body>
                            <b-card-text class="home-text">
                                Spend less time searching and more time helping. With Glacier it's easier to identify the
                                information you need to help someone and make the necessary decisions on who to contact.
                            </b-card-text>
                        </b-card-body>
                    </b-card>

                    <b-card :img-src="institutionImg" img-top>
                        <b-card-title>Institutions</b-card-title>
                        <b-card-body>
                            <b-card-text class="home-text">
                                Knowing that your students are safe is half the battle. Reduce issues amongst the student
                                community and reassure parents that they will be cared for on nights out.
                            </b-card-text>
                        </b-card-body>
                    </b-card>
                </b-card-group>
            </div>
        </b-container>
        <AppFooter />
    </div>
</template>

<script>
    import AppNav from "../components/layout/AppNav";
    import studentImg from "../assets/students.jpg";
    import emergencyImg from "../assets/emergency-services.jpg";
    import institutionImg from "../assets/institution.jpg"
    import AppFooter from "../components/layout/AppFooter";

    export default {
        name: "HomePage",
        components: {AppFooter, AppNav},
        data() {
            return {
                studentImg: studentImg,
                emergencyImg: emergencyImg,
                institutionImg: institutionImg
            }
        }
    }
</script>

<style scoped>
    .main-content{
        margin-top: 1.0rem;
        margin-bottom: 1.0rem;
    }
    .home-text{
        font-weight: 400;
    }
</style>