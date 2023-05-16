export const updateUserProfile = (fieldName: String, table: String) => {
  return 'UPDATE commerce.' + table + ' SET ' + fieldName + ' = $1 WHERE id = $2';
}