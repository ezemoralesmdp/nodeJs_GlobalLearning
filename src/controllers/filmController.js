const filmController = (Film) => {

    const getAllFilms = async (req, res, next) => {
        try{
            const { query } = req
            const response = await Film.find(query)
            res.status(200).json(response)
    
        } catch(err) {
            next(err)
        }
    }

    const postFilm = async (req, res, next) => {
        try{
            const { body } = req
            const film = await new Film(body)
            await film.save()
            res.status(200).json(film)
        } catch(err) {
            next(err)
        }
    }

    const putFilmById = async (req, res, next) => {

        try{
            const { body, params } = req

            const checkData = await Film.find({
                _id: params.id
            })

            if(checkData.length === 0) {
                res.status(403).send('This is not a valid identification')
            }

            await Film.updateOne({
                _id: params.id
            },
            {
                $set: {
                    name: body.name,
                    genre: body.genre,
                    year: body.year,
                    director: body.director,
                    duration: body.duration,
                }
            })

            res.status(200).send('Data successful update')

        }catch(err) {
            next(err)
        }
    }

    const getFilmById = async(req, res, next) => {
        try {
            const { params } = req

            const response = await Film.findById(params.id)

            res.status(200).json(response)

        }catch(err) {
            next(err)
        }
    }

    const deleteFilmById = async(req, res, next) => {
        try {
            const { params } = req

            await Film.findByIdAndDelete(params.id)

            res.status(200).send('The information has been deleted')

        }catch(err) {
            next(err)
        }
    }

    return {
        getAllFilms,
        postFilm,
        putFilmById,
        getFilmById,
        deleteFilmById
    }
}

module.exports = filmController