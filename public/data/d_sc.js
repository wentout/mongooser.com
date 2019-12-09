
const DISCRIMINATOR_MODEL_NAME = 'DiscriminatorModelName';

// creation process
// here we have our discriminator model
let discriminatorModel = BaseModel.discriminator(DISCRIMINATOR_MODEL_NAME);

// the same pointer to model, I use this
let discriminatorModel = BaseModel.discriminator[DISCRIMINATOR_MODEL_NAME];

// the same pointer to model
let discriminatorModel = mogoose.models[DISCRIMINATOR_MODEL_NAME];

// the same pointer to model
let discriminatorModel = mongoose.model(DISCRIMINATOR_MODEL_NAME);


