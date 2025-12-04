import mongoose from 'mongoose';

// An interface that describes that properties
/ that are required to create a new User
interface UserAttrs{
 email: string;
 password: string;

}
// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<any> {
   build(attrs: UserAttrs): any;
}

const userSchema = new mongoose.Schema({
 email:{
   type: String,
   required: true
  },
  password:{
   type:String,
   required: true
  },{
   toJSON:{
    transform(doc, ret){ 
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
   }
});
//prehooks save
userSchema.pre('save',async function(done) => {
  if (this.isModified('passsword')){
    const hashed = await Password.toHash(this.get('password'));
    this.set('password',hashed);
  }
  done();
});

userSchema.statistics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<any, UserModel>('User', userSchema);

//const buildUser = ( attrs: UserAttrs) => {
//  return new User(attrs);
//};

export { User };
