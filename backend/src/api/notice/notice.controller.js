const User = require('../../lib/user')
const getNotice = require('../../database/notice/getNotice')
const updateNotice = require('../../database/notice/updateNotice')
const deleteNotice = require('../../database/notice/deleteNotice')

module.exports.getCount = async ctx => {
  const user = await User.getUser(ctx.get('x-access-token'))
  if (!user) return
  const count = await getNotice.count(user.id)
  ctx.body = { count, status: 'ok' }
}

module.exports.getNotices = async ctx => {
  const { ...body } = ctx.request.body
  const page = body.page || 0
  const limit = body.limit || 20
  if (page < 0 || limit < 20 || limit > 50) return
  const user = await User.getUser(ctx.get('x-access-token'))
  if (!user) return
  const notices = await getNotice.notices(user.id, page, limit)
  ctx.body = { notices, status: 'ok' }
}

module.exports.deleteNotice = async ctx => {
  const { id } = ctx.params
  if (id < 1) return
  const user = await User.getUser(ctx.get('x-access-token'))
  if (!user) return
  await deleteNotice.id(id, user.id)
  ctx.body = { status: 'ok' }
}

module.exports.deleteNotices = async ctx => {
  const user = await User.getUser(ctx.get('x-access-token'))
  if (!user) return
  await deleteNotice(user.id)
  ctx.body = { status: 'ok' }
}

module.exports.updateNoticeByConfirm = async ctx => {
  console.log("A")
  const { id, flag } = ctx.params
  console.log(ctx.params)
  if (id < 1 || flag < 0 || flag > 1) return
  console.log("B")
  const user = await User.getUser(ctx.get('x-access-token'))
  if (!user) return
  console.log("C")
  await updateNotice.id(id, user.id, flag)
  console.log("D")
  ctx.body = { status: 'ok' }
}

module.exports.updateNoticesByConfirm = async ctx => {
  const user = await User.getUser(ctx.get('x-access-token'))
  if (!user) return
  await updateNotice(user.id)
  ctx.body = { status: 'ok' }
}