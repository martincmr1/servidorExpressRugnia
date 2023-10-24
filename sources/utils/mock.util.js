const {faker} = require('@faker-js/faker')

const generateUsers = numUsers => {
    const users = []

    for (let i = 0; i < numUsers; i++) {
        users.push(generateUser())
    }

    return users
}


const generateUser = () => {

  const numOfProducts= faker.string.numeric()
    
    const products =[]

    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProducts())
    }

    return {
        name:faker.person.firstName(),
        lastname: faker.person.lastName(),
        bithDate : faker.date.birthdate(),
        phone:faker.phone.number(),
        image: faker.internet.avatar(),
        description:faker.person.jobTitle(),
        role : faker.helpers.arrayElement(['cliente','vendedor']),
        products
    }
}



const generateProducts = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title : faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.string.numeric({length:2,exclude:['0']}),
        description: faker.lorem.lines(3),
        image:faker.image.urlLoremFlickr({category:'food'}),
    }
}


module.exports=generateUsers