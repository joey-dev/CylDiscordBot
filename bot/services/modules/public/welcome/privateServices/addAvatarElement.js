module.exports.run = (ctx, element, avatar) => {
    let x = element.position.x;
    let y = element.position.y;
    let radius = element.radius;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatar, x - radius, y - radius, radius * 2, radius * 2);

    return ctx;
};

