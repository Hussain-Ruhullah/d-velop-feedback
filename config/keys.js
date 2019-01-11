// add this file to .gitignore
module.exports = {
    google:{
        clientID: '541448945248-rkmvn1jg1rdrpn92i31vo78qicnnui4i.apps.googleusercontent.com',
        clientSecret: 'ZJUPzjxSaiYhsrZObKL8y5cY',
        scope: ['https://www.googleapis.com/auth/userinfo.profile'],
        callbackURL: '/auth/google/redirect'
    },
    mongodb: {
        dbURL: 'mongodb://Hussain:Ruhullah2019!@ds253104.mlab.com:53104/d-velop-test-1',
    },
    session: {
        cookieKey: 'letsdoitrightnow'
    },
    vapidKeys: {
        publicVapidKey:  "BMuNSxvNakqL9p0YU8haLWq4AGeJ1JFZXEiQJ-LKik87qIhTMf-CYxtWB8jTJF76sznJeeTnWR-6dZugISok7aE",
        privateVapidKey: "lAEeEdh-VPn-5E07gZSp9H1OJQnZxvFZeB50K8K18Mk"
    }
    
}