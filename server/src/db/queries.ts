export const updateUserProfile = (fieldName: String, table: String) => {
  return 'UPDATE commerce.' + table + ' SET ' + fieldName + ' = $1 WHERE user_id = $2 RETURNING *';
}