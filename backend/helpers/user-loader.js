const IceUser = require('../models/ice-user');
const ServiceUser = require('../models/service-user');
const Organisation = require('../models/organisation');

async function get_all(user) {
    return Promise.all([
        IceUser.findOne({user: user.id}),
        ServiceUser.findOne({user: user.id})
    ])
        .then(all_array => {
            const [ice, service] = all_array;
            let json = user.toJSON();
            if(ice != null) {
                json.ice = ice.toJSON();
                delete json.ice._id;
                delete json.ice.user;
            }
            if(service != null) {
                json.service = service.toJSON();
                delete json.service._id;
                delete json.service.user;
            }
            json.permission = {
                service: !!has_permission(user)
            }
            return json;
        })
}

function has_permission(user) {
    Organisation.findOne({"domain": process.env.DOMAIN})
        .then(org => {
            return check_service_email(user) || org.staff.contains(user) || org.admin.contains(user);
        })
        .catch(() => {
            if(check_service_email(user)){
                return true;
            } else {
                return false;
            }
        });
}

function has_staff_permission(user) {
    Organisation.findOne({"domain": process.env.DOMAIN})
        .then(org => {
            return org.staff.contains(user) || org.admin.contains(user);
        })
        .catch(() => {
            return false;
        });
}

async function put_ice(data){
    return IceUser.findOneAndUpdate({user: data.user}, data, {new: true})
        .then(ice => {
            if(!ice){
                ice = IceUser(data);
            }
            return ice.save();
        });
}

async function put_service(data){
    return ServiceUser.findOneAndUpdate({user: data.user}, data, {new: true})
        .then(service => {
            if(!service){
                service = ServiceUser(data);
            }
            return service.save();
        });
}

function check_service_email(user){
    let verified = false;
    process.env.SERVICE_DOMAINS.forEach(domain => {
        if(user.email.toString().toLowerCase().endsWith(domain.toLowerCase())){
            verified = true;
        }
    })
    return verified;
}

module.exports = {
    get_all : get_all,
    has_permission : has_permission,
    has_staff_permission : has_staff_permission,
    put_ice : put_ice,
    put_service : put_service,
    check_service_email : check_service_email
}