import bcrypt from "bcryptjs";

const passwordCompareSync = (passwordToTest: string, passowordHasH: string) => 
    bcrypt.compareSync(passwordToTest, passowordHasH)

export default passwordCompareSync