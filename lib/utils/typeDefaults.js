const Appliance = [
  ['key-value', ['Brand', '']],
  ['key-value', ['Model', '']],
  ['key-value', ['Warranty', '']],
  ['log', 'Activity Log', []],
  ['text', 'Notes', '']
];

const Material = [
  ['image', ''],
  ['key-value', ['Brand', '']],
  ['key-value', ['Vendor', '']],
  ['text', 'Notes', '']
];

const Plant = [
  ['image', ''],
  ['key-value', ['Species', '']],
  ['text', 'Care Instructions', '']
];

const Pet = [
  ['image', ''],
  ['log', 'Vet Visits', []],
  ['text', 'Notes', '']
];

const Contact = [
  ['key-value', ['Phone Number', '']],
  ['key-value', ['Email', '']],
  ['text', 'Notes', '']
];

const PaintSwatch = [
  ['image', ''],
  ['key-value', ['Brand', '']],
  ['key-value', ['Color Number', '']],
  ['key-value', ['Finish', '']],
  ['text', 'Notes', '']
];

const Utility = [
  ['key-value', ['Company', '']],
  ['key-value', ['Phone Number', '']],
  ['key-value', ['Account Number', '']],
  ['log', 'Service Log', []],
  ['text', 'Notes', '']
];

module.exports = {
  Appliance,
  Material,
  Plant,
  Pet,
  Contact,
  PaintSwatch,
  Utility
};
