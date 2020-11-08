class ComplexForm extends RepeatingFieldset {
  constructor(name, id) {
		super('forms', id)
    this.name = name || '',
    this.target = 'device',
		this.duration = 'extended',
		this.fade = '0',
		this.skill = 'software',
		this.specialization = 0,
		this.dicepool_modifier = 0,
		this.notes = ''
	}

	set target(value) {
		this.target = value
	}

	set duration(value) {
		this.duration = value
	}

	set fade(value) {
		this.fade = value
	}
}
