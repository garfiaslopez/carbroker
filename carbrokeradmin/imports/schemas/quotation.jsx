const quotation_schema = new SimpleSchema({
    _id: { type: String, optional: true },
    date: { type: Date },
    finalClient: { type: String },
    contact: { type: String },
    email: { type: String },
    phone: { type: String },
    origin: { type: String },
    destiny: { type: String },
    carBrand: { type: String },
    carModel: { type: String },
    kilometers: { type: String },
    observations: { type: String },
    basePrice: { type: Number, decimal: true },
    tollboothPrice: { type: Number, decimal: true },
    totalPrice: { type: Number, decimal: true }
});
const quotation_index = {
    finalClient: "text",
    kilometers: "text"
};

export formSchema = {
    finalClient: {
        label: 'Nombre del Cliente',
        type: String
    },
    contact: {
        label: 'Contacto',
        type: String
    },
    email: {
        label: 'Email',
        type: String
    },
    phone: {
        label: 'Telefono',
        type: String
    },
    origin: {
        label: 'Origen',
        type: String
    },
    destiny: {
        label: 'Destino',
        type: String
    },
    carBrand: {
        label: 'Marca de auto',
        type: String
    },
    carModel: {
        label: 'Modelo de auto',
        type: String
    },
    kilometers: {
        label: 'Kilometros de traslado',
        type: String
    },
    observations: {
        label: 'Observaciones',
        type: String
    },
    basePrice: {
        label: 'Costo de traslado',
        type: Number,
        decimal: true
    },
    tollboothPrice: {
        label: 'Costo de Casetas',
        type: Number,
        decimal: true
    }
};


export default {
    quotation: quotation_schema,
    quotation_index: quotation_index
};
