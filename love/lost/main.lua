require('conf')
require('textures')
require('nodes')
require('maze')
require('player')
require('ghosts')
require('candles')
require('coins')

------------------------
-- Load love
------------------------

function loadWeb()
    if (not love.graphics.origin) then
        love.graphics.origin = function()

        end
    end
end

function love.load()
    loadWeb()

    math.randomseed(os.time())
    textures.load()

    maze.addNewNode(0,0);
    for i = 0, 100 do
        maze.generate();
    end
    maze.writeToMap();
    --candles.addCandle(0, 0)
end

------------------------
-- Update
------------------------

function love.update(dt)
    ghosts.update(dt)
end

------------------------
-- Draw
------------------------

draw = {}
draw.deathMessage = {}
draw.deathMessage.x = 0.5 + math.random()
draw.deathMessage.y = 0.5 + math.random()
draw.restartMessage = {}
draw.restartMessage.x = 0.5 + math.random()
draw.restartMessage.y = 0.5 + math.random()

-- Put origin to the center of the window
local function updateOrigin()
    love.graphics.origin()
    love.graphics.translate(
        love.graphics.getWidth() / 2 - player.x * SIZE,
        love.graphics.getHeight() / 2 - player.y * SIZE
    )
end

function love.draw()
    if (not player.dead) then
        updateOrigin();

        if (not player.blind) then
            -- need this to render textures properly
            love.graphics.setColor(255, 255, 255)

            -- TODO: move nodes, candles, ghosts, etc. into one group so it's easier to iterate
            -- Draw nodes
            for _, node in ipairs(nodes) do
                if (math.abs(node.x - player.x) * SIZE < love.graphics.getWidth()
                        and math.abs(node.y - player.y) * SIZE < love.graphics.getHeight()) then
                    love.graphics.draw(node.texture, node.x * SIZE, node.y * SIZE)
                end
            end

            -- Draw candles
            for _, candle in ipairs(candles) do
                if (candle.x and candle.y) then
                    love.graphics.draw(textures.candle, candle.x * SIZE, candle.y * SIZE)
                end
            end

            -- Draw coins
            for _, coin in ipairs(coins) do
                if (coin.x and coin.y) then
                    if (coins[coin.x] or {})[coin.y] then
                        love.graphics.draw(textures.coin, coin.x * SIZE, coin.y * SIZE)
                    end
                end
            end

            -- Draw ghosts
            for _, ghost in ipairs(ghosts) do
                if (math.abs(ghost.x - player.x) * SIZE < love.graphics.getWidth()
                        and math.abs(ghost.y - player.y) * SIZE < love.graphics.getHeight()) then
                    love.graphics.draw(ghost.texture, ghost.x * SIZE, ghost.y * SIZE)
                end
            end

            -- Draw player
            love.graphics.draw(textures.player, player.x * SIZE, player.y * SIZE)
        end
    else
        love.graphics.setColor(255, 0, 0, 255)
        love.graphics.print(
            "You died.",
            love.graphics.getWidth() / 2 * draw.deathMessage.x,
            love.graphics.getHeight() / 2 * draw.deathMessage.y,
            0, 2, 2)
        love.graphics.setColor(255, 50, 100, 255)
        love.graphics.print(
            "Press C to restart at a checkpoint.",
            love.graphics.getWidth() / 2 * draw.restartMessage.x,
            love.graphics.getHeight() / 2 * draw.restartMessage.y,
            0, 2, 2)
        love.graphics.print(
            "Press R to restart at a random location.",
            love.graphics.getWidth() / 2 * draw.restartMessage.x,
            love.graphics.getHeight() / 2 * draw.restartMessage.y + 25,
            0, 2, 2)
    end

    love.graphics.origin()
    love.graphics.setColor(230, 150, 200, 255)
    love.graphics.print("Score: " .. player.coinsCollected, 0, 2, 0, 2, 2)
end

------------------------
-- Keypressed
------------------------

function love.keypressed(key)
    if (love.web) then
        love.web.javascript("console.log('key pressed')")
        love.web.javascript("console.log('" .. key .. "')")
    end

    if key == "d" then
        player.x = player.x + 1
    end

    if key == "escape" or key == "q" then
        love.event.quit()
    elseif key == "f" then
        love.window.setFullscreen(not (love.window or {}).getFullscreen())
    end

    if key == "up" or key == "w" then
        movement = {
            x = player.x,
            y = player.y - 1
        }
    elseif key == "down" or key == "s" then
        movement = {
            x = player.x,
            y = player.y + 1
        }
    elseif key == "left" or key == "a" then
        movement = {
            x = player.x - 1,
            y = player.y
        }
    elseif key == "right" or key == "d" then
        movement = {
            x = player.x + 1,
            y = player.y
        }
    else
        movement = false
    end

    if movement and nodes.isWalkable(movement.x, movement.y) and player.blind then
        player.x = movement.x
        player.y = movement.y

        if (nodes.isDeadly(movement.x, movement.y)) then
            player.dead = true
        end

        if (candles[movement.x] or {})[movement.y] then
            player.checkpoint.x = movement.x
            player.checkpoint.y = movement.y
        end

        if (coins[movement.x] or {})[movement.y] then
            player.coinsCollected = player.coinsCollected + 1
            coins[movement.x][movement.y] = false
        end
    end

    if key == "space" then
        player.blind = not player.blind
    end


    if (player.dead) then
        draw.deathMessage.x = 0.5 + math.random()
        draw.deathMessage.y = 0.5 + math.random()
        draw.restartMessage.x = 0.5 + math.random()
        draw.restartMessage.y = 0.5 + math.random()

        if (key == "C" or key == "c") then
            if (player.checkpoint) then
                player.x = player.checkpoint.x
                player.y = player.checkpoint.y

                player.dead = false
            end
        elseif (key == "R" or key == "r") then
            local pos = candles[math.random(#candles)] or nodes[math.random(#nodes)]

            player.x = pos.x
            player.y = pos.y

            player.dead = false
        end
    end
end