Player API

    POST /api/players

express deprecated res.send(status): Use res.sendStatus(status) instead src\models\PlayerController.js:43:9

      √ should fail if token not provided

      1) should fail if first_name not present

      2) should fail if last_name not present

      3) should fail if rating not present

      4) should fail if handedness not present

      5) should fail if player with same name exists

      6) should deliver player if successful

    GET /api/players

      7) should fail if token not provided

      8) should deliver an empty array if no players

      9) should deliver all players

      10) should not deliver players created by other users

    DELETE /players/:id

      √ should fail if token not provided

      11) should fail if player does not exist

      12) should fail if player created by different user

      √ should remove the player if successful (206ms)

  User API

    POST /api/user

      13) should fail if first_name not present

      14) should fail if last_name not present

      15) should fail if email not present

      16) should fail if passwords do not match

      17) should fail if user already exists

      18) should deliver user and token if successful

    POST /api/login

      19) should fail if email not found

      20) should fail if password invalid

      21) should deliver user and token if successful

    PUT /api/user/:userId

      22) should update the user data

  3 passing (4s)

  22 failing

  1) Player API POST /api/players should fail if first_name not present:

      Uncaught AssertionError: expected 500 to equal 409

      + expected - actual

      -500

      +409

      at chai.request.post.send.set.end.err (test\api\player.spec.js:47:35)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  2) Player API POST /api/players should fail if last_name not present:

      Uncaught AssertionError: expected 500 to equal 409

      + expected - actual

      -500

      +409

      at chai.request.post.send.set.end.err (test\api\player.spec.js:47:35)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  3) Player API POST /api/players should fail if rating not present:

      Uncaught AssertionError: expected 500 to equal 409

      + expected - actual

      -500

      +409

      at chai.request.post.send.set.end.err (test\api\player.spec.js:47:35)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  4) Player API POST /api/players should fail if handedness not present:

      Uncaught AssertionError: expected 500 to equal 409

      + expected - actual

      -500

      +409

      at chai.request.post.send.set.end.err (test\api\player.spec.js:47:35)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  5) Player API POST /api/players should fail if player with same name exists:

      Uncaught AssertionError: expected 500 to equal 409

      + expected - actual

      -500

      +409

      at chai.request.post.send.set.end.err (test\api\player.spec.js:62:37)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  6) Player API POST /api/players should deliver player if successful:

      Uncaught AssertionError: expected 200 to equal 201

      + expected - actual

      -200

      +201

      at chai.request.post.send.set.end (test\api\player.spec.js:78:33)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:619:12)

      at node_modules\superagent\lib\node\index.js:795:18

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\parsers\json.js:16:7)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  7) Player API GET /api/players should fail if token not provided:

      Uncaught AssertionError: expected 404 to equal 403

      + expected - actual

      -404

      +403

      at chai.request.get.end.err (test\api\player.spec.js:97:33)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  8) Player API GET /api/players should deliver an empty array if no players:

     AssertionError: expected [Error: Not Found] to not exist

      at Context.it (test\api\player.spec.js:112:27)

      at &lt;anonymous&gt;

      at process._tickCallback (internal/process/next_tick.js:188:7)

  9) Player API GET /api/players should deliver all players:

     AssertionError: expected [Error: Not Found] to not exist

      at Context.it (test\api\player.spec.js:133:27)

      at &lt;anonymous&gt;

      at process._tickCallback (internal/process/next_tick.js:188:7)

  10) Player API GET /api/players should not deliver players created by other users:

     AssertionError: expected [Error: Not Found] to not exist

      at Context.it (test\api\player.spec.js:160:27)

      at &lt;anonymous&gt;

      at process._tickCallback (internal/process/next_tick.js:188:7)

  11) Player API DELETE /players/:id should fail if player does not exist:

      AssertionError: expected 500 to equal 404

      + expected - actual

      -500

      +404

      at Context.it (test\api\player.spec.js:198:31)

      at &lt;anonymous&gt;

      at process._tickCallback (internal/process/next_tick.js:188:7)

  12) Player API DELETE /players/:id should fail if player created by different user:

     AssertionError: expected undefined to exist

      at Context.it (test\api\player.spec.js:216:23)

      at &lt;anonymous&gt;

      at process._tickCallback (internal/process/next_tick.js:188:7)

  13) User API POST /api/user should fail if first_name not present:

      Uncaught AssertionError: expected 500 to equal 409

      + expected - actual

      -500

      +409

      at chai.request.post.send.end.err (test\api\user.spec.js:21:35)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  14) User API POST /api/user should fail if last_name not present:

      Uncaught AssertionError: expected 500 to equal 409

      + expected - actual

      -500

      +409

      at chai.request.post.send.end.err (test\api\user.spec.js:21:35)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  15) User API POST /api/user should fail if email not present:

      Uncaught AssertionError: expected 500 to equal 409

      + expected - actual

      -500

      +409

      at chai.request.post.send.end.err (test\api\user.spec.js:21:35)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  16) User API POST /api/user should fail if passwords do not match:

     Uncaught AssertionError: expected null to exist

      at chai.request.post.send.end.err (test\api\user.spec.js:33:25)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:619:12)

      at node_modules\superagent\lib\node\index.js:795:18

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\parsers\json.js:16:7)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  17) User API POST /api/user should fail if user already exists:

      Uncaught AssertionError: expected 500 to equal 409

      + expected - actual

      -500

      +409

      at chai.request.post.send.end.err (test\api\user.spec.js:47:37)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  18) User API POST /api/user should deliver user and token if successful:

      Uncaught AssertionError: expected 200 to equal 201

      + expected - actual

      -200

      +201

      at chai.request.post.send.end (test\api\user.spec.js:62:33)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:619:12)

      at node_modules\superagent\lib\node\index.js:795:18

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\parsers\json.js:16:7)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  19) User API POST /api/login should fail if email not found:

      Uncaught AssertionError: expected 404 to equal 401

      + expected - actual

      -404

      +401

      at chai.request.post.send.end.err (test\api\user.spec.js:86:33)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  20) User API POST /api/login should fail if password invalid:

      Uncaught AssertionError: expected 404 to equal 401

      + expected - actual

      -404

      +401

      at chai.request.post.send.end.err (test\api\user.spec.js:97:33)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  21) User API POST /api/login should deliver user and token if successful:

     Uncaught AssertionError: expected [Error: Not Found] to not exist

      at chai.request.post.send.end (test\api\user.spec.js:107:29)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)

  22) User API PUT /api/user/:userId should update the user data:

     Uncaught AssertionError: expected [Error: Internal Server Error] to not exist

      at chai.request.put.send.end (test\api\user.spec.js:135:29)

      at Test.Request.callback (node_modules\superagent\lib\node\index.js:631:3)

      at IncomingMessage.&lt;anonymous&gt; (node_modules\superagent\lib\node\index.js:795:18)

      at endReadableNT (_stream_readable.js:1055:12)

      at _combinedTickCallback (internal/process/next_tick.js:138:11)

      at process._tickCallback (internal/process/next_tick.js:180:9)