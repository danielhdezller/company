export const fakeInDb = async function (repo, fakeData, arr = []) {
  const fake = repo.create(fakeData);
  const newFake = await repo.save(fake);
  arr.push(newFake);

  return newFake;
};
