const peopleController = (People) => {

    const getAllPeople = async (req, res, next) => {
        try{
            const { query } = req
            const response = await People.find(query)
            res.status(200).json(response)
    
        } catch(err) {
            next(err)
        }
    }

    const postPeople = async (req, res, next) => {
        try{
            const { body } = req
            const people = await new People(body)
            await people.save()
            res.status(200).json(people)
        } catch(err) {
            next(err)
        }
    }

    const putPeopleById = async (req, res, next) => {

        try{
            const { body, params } = req

            const checkData = await People.find({
                _id: params.id
            })

            if(checkData.length === 0) {
                res.status(403).send('This is not a valid identification')
            }

            await People.updateOne({
                _id: params.id
            },
            {
                $set: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    username: body.username,
                    password: body.password,
                    email: body.email,
                    address: body.address,
                    phone: body.phone
                }
            })

            res.status(200).send('Data successful update')

        }catch(err) {
            next(err)
        }
    }

    const getPeopleById = async(req, res, next) => {
        try {
            const { params } = req

            const response = await People.findById(params.id)

            res.status(200).json(response)

        }catch(err) {
            next(err)
        }
    }

    const deletePeopleById = async(req, res, next) => {
        try {
            const { params } = req

            await People.findByIdAndDelete(params.id)

            res.status(200).send('The information has been deleted')

        }catch(err){
            next(err)
        }
    }

    return {
        getAllPeople,
        postPeople,
        putPeopleById,
        getPeopleById,
        deletePeopleById
    }
}

module.exports = peopleController