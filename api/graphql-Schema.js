const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        login(input : LRInput) : Token!,
        getUsers : [User]!,
        getProduct(page : Int, limit : Int, productId : ID) : [product!]!,
        getAllCategory(input : InputgetCategory) : [Category!]!,
        senMail : operation!,
        getAllBrand(input : InputGetBrand) : [Brand!]!
        getAllSurvey(categoryId : ID!) : Survey!
        getAllProductSpecs(categoryId : ID!) : [Specs!]!
        getAllProductSpecsDetails(specsId : ID!) : [SpecsDetails!]!
        getAllSeller(categoryId : ID!) : [Seller!]!
        getAllWarranty : [Warranty!]!
        getAddProductInfo(categoryId : ID, getSubCategory : Boolean!, subCategoryId : ID) : addProductInfo!,
        getAllComment(page : Int, limit : Int, productId : ID, commentId : ID) : [Comment]
        
        MainPageApp : mainInfo

        verifyRegister : operation,
        getAllPayment(orderId : ID) : [Payment]

        getAllOrderStatus : [OrderStatus]

    }

    type Mutation {
        register(input : LRInput) : operation!,
        multimedia(file : Upload!) : UploadFile!,
        category(input : InputCategory) : operation!,
        survey(input : InputSurvey) : operation!,
        brand(input : InputBrand) : operation!,
        product(input : InputProduct) : operation!,
        productSpecs(input : InputProductSpecs) : ProductOperation!,
        productSpecsDetails(input : InputProductSpecsDetails) : ProductOperation!,
        productDetailsValue(input : InputProductDetailsValue) : operation!,
        UserForgetPassword(input : InputUserForgetPassword) : operation!,
        UserResetPassword(input : InputUserResetPassword) : operation!,
        ResetPassword(input : InputResetPassword) : operation!,
        seller(category : ID!, name : String!, label : String) : operation!,
        warranty(name : String!, label : String) : operation!,
        comment(input : InputComment) : operation!,
        addSurveyValue(input : InputSurveyValue) : operation!
        slider(imageId : ID) : operation!,
        payment( input : Inputpayment) : operation!,
        receptor(input : InputReceptor) : operation,
        OrderStatus(name : String!, image : Upload!) : operation!


        UpdateCategory(input : InputCategory) : operation!
        UpdateBrand(input : InputBrand) : operation!,
        UpdateProductSpecs(input : InputProductSpecs) : operation!,
        UpdateProductSpecsDetails(input : InputProductSpecsDetails) : operation!,
        UpdateSeller(id : ID!, name : String!, label : String) : operation!,
        UpdateWarranty(name : String!, label : String) : operation!,
        UpdateProduct(input : UpdateProduct) : operation!,
        UpdateProducctAttribute(input : InputProductAttribute) : operation!,
        UpdateCommentProduct(commentId : ID!) : operation!,


    }

    input InputReceptor {
        fname : String!,
        lname : String!,
        code : String!,
        number : String!,
        phone : String!,
        state : ID!,
        city : ID!,
        address : String!,
    }

    input Inputpayment {
        product : ID!,
        payment : Boolean!,
        resnumber : String,
        attribute : ID,
        discount : Int,
        count : Int,
        price : Int,
        receptor : ID
    }

    input InputSurveyValue {
        survey : ID!,
        value : Int = 3
    }

    input InputComment {
        user : ID!,
        product : ID!,
        survey : [InputSurveyValue!]!
        title : String!,
        description : String!,
        like : Int = 0,
        dislike : Int = 0,
        negative : [String],
        positive : [String],
        check : Boolean = false
    }

    input InputGetBrand {
        page : Int,
        limit : Int,
        category : ID,
        getAll : Boolean
    }

    input InputgetCategory {
        catId : ID
        page : Int,
        limit : Int,
        mainCategory : Boolean,
        parentCategory : Boolean,
    }

    input InputResetPassword {
        phone : String!,
        password : String!,
        repassword : String!
    }

    input InputUserResetPassword {
        phone : String!,
        code : String
    }

    input InputUserForgetPassword {
        phone : String!
    }

    input InputProductSpecs {
        id : ID
        category : ID!,
        specs : String!,
        label : String
    }

    input InputProductSpecsDetails {
        id : ID
        specs : ID!,
        name : String!,
        label : String
    }

    input InputProductDetailsValue {
        p_details : ID!,
        value : String!,
        label : String
    }

    input InputProductAttribute {
        addSeller : Boolean
        attribute : [InputAttribute!]!
    }

    input InputProduct {
        id : ID,
        fname : String!,
        ename : String!,
        category : ID!
        brand : ID!,
        attribute : [InputAttribute!]!,
        description : String!,
        rate : Int,
        details : [InputDetails!]!,
        image : Upload!
    }

    input UpdateProduct {
        id : ID,
        fname : String!,
        ename : String!,
        category : ID!
        brand : ID!,
        attribute : [ID]!,
        description : String!,
        rate : Int,
        details : [UpdateDetails!]!,
        image : Upload!
    }

    input InputDetails {
        id : ID
        p_details : ID!,
        value : String!,
        label : String
    }

    input UpdateDetails {
        id : ID
        value : String!,
        label : String
    }

    input InputAttribute {
        id : ID
        seller : ID!
        warranty : ID!,
        color : String!,
        price : Int!,
        stock : Int!,
        discount : Int,
        suggestion : Boolean,
        expireAt : Int = 24

    }

    input InputBrand {
        id : ID,
        category : [ID]!,
        name : String!,
        label : String,
        image : Upload!
    }

    input InputSurvey {
        list : [InputSurveyList!]!
    }

    input InputSurveyList {
        category : ID!,
        name : String!,
        label : String
    }

    input InputCategory {
        id : ID
        name : String!,
        label : String,
        parent : ID,
    }

    type operation {
        _id : ID,
        status : Int,
        message : String
    }

    type ProductOperation {
        _id : ID,
        status : Int,
        message : String
    }

    input LRInput {
        fname : String,
        lname : String,
        code : Int,
        number : String,
        birthday : String,
        gender : Gender,
        phone : String!,
        email : String,
        password : String!,
        level : Boolean,
        digit : Int
    }

    enum Gender {
        Male,
        Female
    }

    type Token {
        token : String!
    }

    type User {
        fname : String,
        lname : String,
        code : Int,
        number : String,
        birthday : String,
        gender : Gender,
        phone : String!,
        email : String,
        password : String!,
    }

    type UploadFile {
        name : String!,
        attribute : String,
        dimwidth : String,
        dimheight : String,
        dir : String!
    }

    type product {
        _id : ID
        fname : String,
        ename : String,
        category : Category
        brand : Brand,
        attribute : [Attribute],
        description : String!,
        rate : Int,
        details : [Details],
        image : [String],
        commentCount : Int,
        soldCount : Int,
        viewCount : Int
    }

    type Attribute {
        _id : ID,
        seller : Seller
        warranty : Warranty,
        color : String,
        price : String,
        stock : Int,
        discount : Int,
        suggestion : Boolean,
        expireAt : Date
    }

    scalar Date

    type Details {
        _id : ID
        p_details : SpecsDetails,
        value : String,
        label : String
    }

    type Category {
        _id : ID
        name : String,
        label : String,
        parent : Parent,
    }

    type Parent {
        _id : ID,
        name : String,
        label : String,
        parent : Category
    }

    type Brand {
        _id : ID,
        category : [Category],
        name : String,
        label : String,
        image : String
    }

    type Survey {
        _id : ID,
        category : ID
        name : String!,
        label : String
    }

    type Specs {
        _id : ID!
        category : ID!
        specs : String!,
        label : String,
        details : [SpecsDetails]
    }

    type SpecsDetails {
        _id : ID!,
        specs : Specs,
        name : String!,
        label : String,
    }

    type Seller {
        _id : ID
        category : ID,
        name : String,
        label : String
    }

    type Warranty {
        _id : ID,
        name : String,
        label : String
    }

    type addProductInfo {
        sellers : [Seller],
        brands : [Brand],
        subcats : [Category],
        specs : [Specs]
    }

    type mainInfo {
        slider : Slider,
        category : [Category],
        Asuggestion : [product],
        banerDiscount : [Category],
        Tselling : [product],
        Nproduct : [product]
    }

    type Slider {
        image : String,
        attr : String,
        label : String
    }

    
    type Comment {
        _id : ID,
        user : User,
        product : product,
        survey : [SurveyValue],
        title : String,
        description : String,
        like : Int,
        dislike : Int,
        negative : [String],
        positive : [String],
        createdAt : Date,
        check : Boolean,
    }

    type SurveyValue {
        survey : Survey,
        value : String
    }

    type Receptor {
        fname : String,
        lname : String,
        code : String,
        number : String,
        phone : String,
        state : ID,
        city : ID,
        address : String,
    }

    type Payment {
        _id :ID,
        user : User,
        product : product,
        payment : Boolean!,
        resnumber : String,
        attribute : Attribute,
        discount : Int,
        count : Int,
        price : Int,
        receptor : Receptor,
        createdAt: Date
    }

    type OrderStatus {
        name : String,
        image : String,
        _id : ID,
    }


`;

module.exports = typeDefs;