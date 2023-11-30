const { Router } = require('express');
const { Student } = require('../../models');
const { Ticket } = require('../../models');

function attchementTicket(student) {
  return Object.assign({},
    student, { tickets: Ticket.get().filter(ticket => ticket.studentId === student.id) });
    
}
const router = new Router();
router.get('/', (req, res) => res.status(200).json(Student.get()));
router.get('/:studentId', (req, res) => res.status(200).json(Student.getById(req.params.studentId)));
router.delete('/:studentId', (req, res) => { try { Student.delete(req.params.studentId); res.status(204).end(); } catch (err) { console.error(err); res.status(500).json(err); } } );
router.put('/:studentId', (req, res) => res.status(200).json(Student.update(req.params.studentId, req.body)));
router.post('/', (req, res) => {
  try {
    const student = Student.create(req.body);
    res.status(201).json(attchementTicket(student));
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

module.exports = router;
