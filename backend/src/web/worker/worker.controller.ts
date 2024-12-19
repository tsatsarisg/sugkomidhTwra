import { Request, Response } from 'express'
import Joi from 'joi'
import { IWorkerComponent } from '../../components/worker'

const createSchema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    location: Joi.string().required(),
    skills: Joi.array().required(),
})

export default class WorkerController {
    constructor(private workerComponent: IWorkerComponent) {
        this.workerComponent = workerComponent
    }

    get = async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        const worker = await this.workerComponent.getWorker(id as string)

        return res.status(200).json(worker)
    }

    list = async (req: Request, res: Response) => {
        const workers = await this.workerComponent.getWorkers()

        return res.status(200).json(workers)
    }

    create = async (req: Request, res: Response) => {
        const { error, value } = createSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error })
        }

        const franchise = await this.workerComponent.createWorker(value)

        return res.status(201).json(franchise)
    }

    delete = async (req: Request, res: Response) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        return res.json(await this.workerComponent.deleteWorker(id))
    }
}
